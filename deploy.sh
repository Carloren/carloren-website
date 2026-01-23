#!/bin/bash

# Carloren Website Complete Deployment Script
# This script deploys both backend (Flask) and frontend (Vite/React)

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_header() {
    echo -e "${PURPLE}============================================================${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}============================================================${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies on different systems
install_system_deps() {
    print_info "Checking system dependencies..."
    
    # Check Python3
    if ! command_exists python3; then
        print_warning "Python3 not found. Installing..."
        if command_exists apt; then
            sudo apt update && sudo apt install -y python3 python3-pip python3-venv
        elif command_exists yum; then
            sudo yum install -y python3 python3-pip
        elif command_exists brew; then
            brew install python3
        else
            print_error "Cannot install Python3. Please install it manually."
            exit 1
        fi
    fi
    print_status "Python3 is available"
    
    # Check Node.js
    if ! command_exists node; then
        print_warning "Node.js not found. Installing..."
        if command_exists apt; then
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
        elif command_exists yum; then
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo yum install -y nodejs
        elif command_exists brew; then
            brew install node
        else
            print_error "Cannot install Node.js. Please install it manually."
            exit 1
        fi
    fi
    print_status "Node.js is available"
    
    # Check npm
    if ! command_exists npm; then
        print_warning "npm not found. Usually comes with Node.js..."
        if command_exists node; then
            print_info "Node.js is installed but npm is missing. This is unusual."
            print_error "Please reinstall Node.js to get npm."
            exit 1
        fi
    fi
    print_status "npm is available"
}

# Function to setup backend
setup_backend() {
    print_header "SETTING UP BACKEND"
    
    cd backend || { print_error "Backend directory not found"; exit 1; }
    
    # Create virtual environment
    print_info "Creating Python virtual environment..."
    python3 -m venv venv
    print_status "Virtual environment created"
    
    # Activate virtual environment
    print_info "Activating virtual environment..."
    source venv/bin/activate
    print_status "Virtual environment activated"
    
    # Upgrade pip
    print_info "Upgrading pip..."
    pip install --upgrade pip
    print_status "pip upgraded"
    
    # Install Python dependencies
    print_info "Installing Python dependencies..."
    pip install -r requirements.txt
    print_status "Python dependencies installed"
    
    # Initialize database
    print_info "Initializing database..."
    python create_doblajes_db.py 2>/dev/null || print_warning "Database script not found or already initialized"
    print_status "Database ready"
    
    cd ..
    print_status "Backend setup completed"
}

# Function to setup frontend
setup_frontend() {
    print_header "SETTING UP FRONTEND"
    
    cd frontend || { print_error "Frontend directory not found"; exit 1; }
    
    # Clean install
    print_info "Cleaning previous installation..."
    rm -rf node_modules package-lock.json 2>/dev/null || true
    
    # Install dependencies
    print_info "Installing Node.js dependencies..."
    npm install
    print_status "Node.js dependencies installed"
    
    # Build for production (optional)
    if [ "$1" = "production" ]; then
        print_info "Building for production..."
        npm run build
        print_status "Production build completed"
    fi
    
    cd ..
    print_status "Frontend setup completed"
}

# Function to start backend server
start_backend() {
    print_info "Starting Flask backend server..."
    cd backend
    source venv/bin/activate
    
    # Set environment variables
    export FLASK_APP=server.py
    export FLASK_ENV=development
    export PORT=3000
    
    # Start backend in background
    nohup python server.py > ../logs/backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../pids/backend.pid
    
    cd ..
    print_status "Backend server started (PID: $BACKEND_PID)"
    sleep 2
}

# Function to start frontend server
start_frontend() {
    print_info "Starting Vite frontend server..."
    cd frontend
    
    # Start frontend in background
    nohup npm run dev > ../logs/frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > ../pids/frontend.pid
    
    cd ..
    print_status "Frontend server started (PID: $FRONTEND_PID)"
    sleep 3
}

# Function to check server status
check_servers() {
    print_info "Checking server status..."
    
    # Check backend
    if curl -s http://localhost:3000/api/doblajes >/dev/null; then
        print_status "Backend server is running on http://localhost:3000"
    else
        print_error "Backend server is not responding"
        return 1
    fi
    
    # Check frontend
    if curl -s http://localhost:5173 >/dev/null; then
        print_status "Frontend server is running on http://localhost:5173"
    else
        print_error "Frontend server is not responding"
        return 1
    fi
    
    return 0
}

# Function to stop servers
stop_servers() {
    print_header "STOPPING SERVERS"
    
    # Stop backend
    if [ -f pids/backend.pid ]; then
        BACKEND_PID=$(cat pids/backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            kill $BACKEND_PID
            print_status "Backend server stopped"
        fi
        rm -f pids/backend.pid
    fi
    
    # Stop frontend
    if [ -f pids/frontend.pid ]; then
        FRONTEND_PID=$(cat pids/frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            kill $FRONTEND_PID
            print_status "Frontend server stopped"
        fi
        rm -f pids/frontend.pid
    fi
    
    # Kill any remaining processes
    pkill -f "python server.py" 2>/dev/null || true
    pkill -f "npm run dev" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    print_status "All servers stopped"
}

# Function to show logs
show_logs() {
    echo "=== Backend Logs ==="
    tail -f logs/backend.log &
    BACKEND_LOG_PID=$!
    
    echo "=== Frontend Logs ==="
    tail -f logs/frontend.log &
    FRONTEND_LOG_PID=$!
    
    # Wait for Ctrl+C
    trap "kill $BACKEND_LOG_PID $FRONTEND_LOG_PID 2>/dev/null; exit 0" INT
    wait
}

# Function to open browser
open_browser() {
    print_info "Opening browser..."
    
    # Try different commands to open browser
    if command_exists xdg-open; then
        xdg-open http://localhost:5173 >/dev/null 2>&1 &
    elif command_exists open; then
        open http://localhost:5173 >/dev/null 2>&1 &
    elif command_exists sensible-browser; then
        sensible-browser http://localhost:5173 >/dev/null 2>&1 &
    else
        print_warning "Could not open browser automatically"
        print_info "Please open http://localhost:5173 in your browser"
    fi
}

# Create necessary directories
mkdir -p logs pids

# Main deployment function
deploy() {
    local mode=${1:-development}
    
    print_header "CARLOREN WEBSITE DEPLOYMENT ($mode)"
    
    # Stop any existing servers
    stop_servers
    
    # Install system dependencies
    install_system_deps
    
    # Setup backend
    setup_backend
    
    # Setup frontend
    setup_frontend $mode
    
    # Start servers
    print_header "STARTING SERVERS"
    start_backend
    start_frontend
    
    # Check if servers are running
    sleep 5
    if check_servers; then
        print_header "DEPLOYMENT SUCCESSFUL!"
        echo -e "${GREEN}Backend API:${NC} http://localhost:3000"
        echo -e "${GREEN}Frontend App:${NC} http://localhost:5173"
        echo ""
        echo -e "${YELLOW}Logs:${NC} ./deploy.sh logs"
        echo -e "${YELLOW}Stop servers:${NC} ./deploy.sh stop"
        echo -e "${YELLOW}Server status:${NC} ./deploy.sh status"
        
        # Open browser
        open_browser
        
        return 0
    else
        print_error "Deployment failed - servers are not responding"
        stop_servers
        return 1
    fi
}

# Function to show status
show_status() {
    print_header "SERVER STATUS"
    
    # Check if PID files exist and processes are running
    if [ -f pids/backend.pid ]; then
        BACKEND_PID=$(cat pids/backend.pid)
        if kill -0 $BACKEND_PID 2>/dev/null; then
            print_status "Backend server running (PID: $BACKEND_PID)"
        else
            print_error "Backend server not running (stale PID file)"
            rm -f pids/backend.pid
        fi
    else
        print_error "Backend server not running"
    fi
    
    if [ -f pids/frontend.pid ]; then
        FRONTEND_PID=$(cat pids/frontend.pid)
        if kill -0 $FRONTEND_PID 2>/dev/null; then
            print_status "Frontend server running (PID: $FRONTEND_PID)"
        else
            print_error "Frontend server not running (stale PID file)"
            rm -f pids/frontend.pid
        fi
    else
        print_error "Frontend server not running"
    fi
    
    # Test connectivity
    echo ""
    check_servers
}

# Main script logic
case "${1:-deploy}" in
    "deploy"|"start")
        deploy development
        ;;
    "production"|"prod")
        deploy production
        ;;
    "stop")
        stop_servers
        ;;
    "restart")
        stop_servers
        sleep 2
        deploy development
        ;;
    "status")
        show_status
        ;;
    "logs")
        show_logs
        ;;
    "help"|"-h"|"--help")
        echo "Carloren Website Deployment Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  deploy, start    Deploy and start servers (development mode)"
        echo "  production, prod Deploy for production"
        echo "  stop             Stop all servers"
        echo "  restart          Restart all servers"
        echo "  status           Show server status"
        echo "  logs             Show server logs"
        echo "  help             Show this help"
        echo ""
        echo "URLs:"
        echo "  Backend:  http://localhost:3000"
        echo "  Frontend: http://localhost:5173"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac