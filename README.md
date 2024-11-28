# Ollama Chat Interface

A modern, responsive chat interface for Ollama AI, built with React, TypeScript, and Tailwind CSS.

![ksnip_20241128-095728](https://github.com/user-attachments/assets/37d790a2-0274-4cd7-b967-48abdd291746)


## Prerequisites

Before installing, ensure you have the following on your Arch Linux system:

```bash
# Core dependencies
sudo pacman -S base-devel git nodejs npm
```

## Installation Steps

### 1. Install Ollama

First, install Ollama using the AUR helper of your choice (we'll use `yay` in this example):

```bash
# Install yay if you haven't already
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si

# Install Ollama
yay -S ollama-bin
```

### 2. Start Ollama Service

```bash
# Start Ollama service
systemctl --user enable --now ollama

# Download the LLaMA2 model
ollama pull llama2
```

### 3. Clone and Set Up the Chat Interface

```bash
# Clone the repository
git clone <your-repo-url>
cd ollama-chat

# Install dependencies
npm install

# Create .env file
echo "VITE_OLLAMA_HOST=http://localhost:11434" > .env
```

### 4. Configure the Application

Update the Ollama API endpoint in `src/App.tsx` to match your local setup:

```typescript
const OLLAMA_API = import.meta.env.VITE_OLLAMA_HOST || 'http://localhost:11434';
```

### 5. Run the Application

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

```bash
# Run in development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
ollama-chat/
├── src/
│   ├── components/     # React components
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── index.html         # HTML entry point
```

## Features

- 🎨 Modern, dark-themed UI
- 💬 Real-time chat interface
- 🚀 Fast and responsive
- 📱 Mobile-friendly design
- 🔒 Local AI processing
- ⚡ Built with Vite
- 🎭 TypeScript support
- 🎨 Tailwind CSS styling

## Troubleshooting

### Common Issues

1. **Ollama Service Not Starting**
   ```bash
   # Check service status
   systemctl --user status ollama
   
   # View logs
   journalctl --user -u ollama
   ```

2. **Permission Issues**
   ```bash
   # Ensure correct permissions
   sudo chown -R $USER:$USER ~/.ollama
   ```

3. **Network Connection**
   ```bash
   # Test API connection
   curl http://localhost:11434/api/version
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Ollama](https://ollama.ai/) for the amazing AI model
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety
