# AI/ML Eat the Dot

A machine learning learning project that presents ML agents in a game-like 3D environment. This project uses Fastify for the backend API and Three.js for the 3D game frontend.

## 🎯 Project Overview

This project is designed to help learn machine learning concepts through interactive visualization. ML agents will be trained to navigate and interact in a 3D game world, with the backend handling the ML processing and the frontend providing real-time visualization.

## 🏗️ Architecture

- **Backend**: Fastify (Node.js) - Handles ML processing, agent training, and game state management
- **Frontend**: Three.js - 3D game environment for visualizing ML agent behavior
- **Communication**: WebSocket for real-time updates between backend and frontend
- **ML Framework**: TensorFlow.js for machine learning algorithms

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-ml-eat-the-dot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
ai-ml-eat-the-dot/
├── backend/                 # Fastify server
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── ml/            # Machine learning modules
│   │   └── game/          # Game state management
│   ├── package.json
│   └── server.js
├── frontend/               # Three.js client
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── game/         # Three.js game logic
│   │   ├── ml/           # ML visualization
│   │   └── utils/        # Utility functions
│   ├── package.json
│   └── index.html
├── shared/                # Shared types and utilities
├── package.json
└── README.md
```

## 🎮 Features

### Core Features
- **3D Game Environment**: Interactive 3D world built with Three.js
- **ML Agent Training**: Backend handles agent training and decision making
- **Real-time Visualization**: Live updates of agent behavior and training progress
- **Multiple ML Algorithms**: Support for different ML approaches (reinforcement learning, neural networks, etc.)
- **Interactive Controls**: User controls for training parameters and visualization options

### Planned Features
- **Multiple Agent Types**: Different ML algorithms competing in the same environment
- **Training Metrics**: Real-time visualization of training progress and performance
- **Custom Environments**: Ability to create different game scenarios
- **Export/Import**: Save and load trained models
- **Performance Analytics**: Detailed analysis of agent performance

## 🧠 Machine Learning Components

### Backend ML Services
- **Agent Training**: Reinforcement learning algorithms
- **Model Management**: Save/load trained models
- **Environment Simulation**: Game state management and physics
- **Performance Tracking**: Training metrics and analytics

### Frontend ML Visualization
- **Agent Behavior**: Real-time visualization of agent decisions
- **Training Progress**: Live charts and metrics
- **Environment Interaction**: Visual feedback for agent actions
- **Parameter Controls**: Interactive training parameter adjustment

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm run test         # Run tests
npm run build        # Build for production
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
```

### Full Stack Development
```bash
npm run dev          # Start both backend and frontend
npm run build        # Build both applications
npm run test         # Run all tests
```

## 📊 API Documentation

### WebSocket Events
- `agent:update` - Agent position and state updates
- `training:progress` - Training metrics and progress
- `environment:change` - Environment state changes
- `model:save` - Model save/load operations

### REST API Endpoints
- `GET /api/agents` - Get all agents
- `POST /api/agents` - Create new agent
- `GET /api/agents/:id` - Get agent details
- `PUT /api/agents/:id/train` - Start training agent
- `GET /api/models` - Get saved models
- `POST /api/models` - Save model
- `GET /api/environment` - Get environment state

## 🧪 Testing

```bash
# Run all tests
npm test

# Run backend tests only
cd backend && npm test

# Run frontend tests only
cd frontend && npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t ai-ml-eat-the-dot .
docker run -p 3000:3000 ai-ml-eat-the-dot
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Learning Goals

This project is designed to help learn:
- **Machine Learning**: Reinforcement learning, neural networks, training algorithms
- **3D Graphics**: Three.js, WebGL, 3D game development
- **Real-time Systems**: WebSocket communication, live data visualization
- **Full-stack Development**: Node.js, Fastify, modern JavaScript/TypeScript
- **Software Architecture**: Microservices, API design, state management

## 📚 Resources

- [Fastify Documentation](https://www.fastify.io/docs/)
- [Three.js Documentation](https://threejs.org/docs/)
- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) 