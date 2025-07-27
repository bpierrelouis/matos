# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript application for managing military equipment announcements ("annonces de matériel"). It's built with Vite, React 19, TypeScript, Tailwind CSS, and DaisyUI components.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript compiler then Vite build)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Architecture

### Core Structure
- **Context Pattern**: Uses React Context (`AnnonceContext`) for state management of announcements
- **Component Structure**: Clean separation with dedicated components for forms and lists
- **TypeScript**: Strongly typed with custom interfaces and utility types

### Key Files
- `src/context/AnnonceContext.tsx` - Centralized state management for announcements with CRUD operations
- `src/types/Annonce.ts` - Type definitions including `Annonce`, `CreateAnnonceData`, and `UpdateAnnonceData`
- `src/components/AnnonceForm.tsx` - Form component handling both create and edit modes
- `src/components/AnnonceList.tsx` - List display with edit/delete actions
- `src/App.tsx` - Main app with modal management for forms

### State Management
- All announcement data managed through `useAnnonces()` hook
- In-memory storage (no persistence) using `useState`
- CRUD operations: create, update, delete, and get single announcement
- Uses `crypto.randomUUID()` for ID generation

### Styling
- Tailwind CSS for utility classes
- DaisyUI components for UI elements (buttons, cards, modals, forms)

## TypeScript Configuration

The project uses a multi-config TypeScript setup:
- `tsconfig.json` - Root configuration with project references
- `tsconfig.app.json` - Application-specific TypeScript config
- `tsconfig.node.json` - Node.js/build tool specific config