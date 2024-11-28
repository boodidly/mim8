# Ollama Chat Interface

A modern, responsive chat interface for Ollama AI, built with React, TypeScript, and Tailwind CSS.

![ksnip_20241128-095728](https://github.com/user-attachments/assets/37d790a2-0274-4cd7-b967-48abdd291746)


## Prerequisites




```

## Installation Steps
Install Ollama

curl -fsSL https://ollama.com/install.sh | sh

```

### 3. Clone and Set Up the Chat Interface

```bash
# Clone the repository
git clone https://github.com/boodidly/mim8
cd mim8

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

sudo npm audit fix

```bash
# Start the development server
sudo npm audit fix

sudo npm install

sudo npm run dev --host
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

This project is licensed under my "Do whatever you want with it" License.
Enjoy !

## Acknowledgments

- [Ollama](https://ollama.ai/) for the amazing AI model
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety
