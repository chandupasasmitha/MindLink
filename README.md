# MindLink - University Mental Wellness Platform

A comprehensive, anonymous mental health support platform designed specifically for university students, featuring peer support, mood tracking, community forums, and professional resources.

## 🌟 Core Features

### 1. **Anonymous Authentication System**
- **Student Registration**: Sign up with anonymous usernames, optional email for recovery
- **Volunteer Registration**: Enhanced verification process for peer supporters
- **Guest Access**: Browse community content without registration
- **Privacy First**: No personal data collection, complete anonymity maintained

### 2. **Mood Tracking & Wellness Dashboard**
- Daily/weekly mood check-ins with emoji scale (1-5)
- Private mood history and trend analysis
- Automated sentiment analysis and intervention triggers
- Personalized wellness insights and resources
- Streak tracking and progress visualization

### 3. **Peer Support Chat System**
- One-on-one anonymous chats with trained volunteers
- Topic-based matching (academic stress, social anxiety, relationships, etc.)
- Crisis detection and automatic escalation
- Queue management and volunteer availability status
- Real-time communication with emergency protocols

### 4. **SpeakUp Community Forum**
- Anonymous discussion boards with moderation
- Tag-based categorization (#stress, #anxiety, #relationships, etc.)
- Upvote system for helpful responses
- Reply threads and community engagement
- Content filtering and search functionality

### 5. **Positive Content Feed**
- Curated mental health resources and tips
- Motivational content tailored to mood patterns
- Professional resource recommendations
- Crisis support information and hotlines

## 🏗️ Architecture & Tech Stack

### Frontend (Current Implementation)
- **React 18** with TypeScript
- **Tailwind CSS** for styling with custom color palette
- **Vite** for development and building
- **React Router** for navigation
- **Shadcn/ui** components for consistent UI
- **Lucide React** for icons

### Backend Integration Points (Ballerina)

The frontend is designed to integrate with a Ballerina backend with the following API endpoints:

#### Authentication Endpoints
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/verify
```

#### User Management
```
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/profile
GET    /api/users/stats
```

#### Mood Tracking
```
POST /api/moods/checkin
GET  /api/moods/history
GET  /api/moods/analytics
GET  /api/moods/trends
```

#### Peer Support Chat
```
POST /api/chat/request-support
GET  /api/chat/queue (volunteers only)
POST /api/chat/accept/{requestId}
POST /api/chat/message
GET  /api/chat/history/{sessionId}
POST /api/chat/end-session
```

#### Forum (SpeakUp)
```
GET    /api/forum/posts
POST   /api/forum/posts
GET    /api/forum/posts/{id}
POST   /api/forum/posts/{id}/reply
POST   /api/forum/posts/{id}/upvote
GET    /api/forum/tags
```

#### Volunteer Management
```
GET  /api/volunteers/dashboard
POST /api/volunteers/status (online/offline)
GET  /api/volunteers/stats
POST /api/volunteers/training-complete
```

#### Crisis & Resources
```
GET  /api/resources/crisis
GET  /api/resources/self-care
POST /api/crisis/alert
GET  /api/crisis/protocols
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Ballerina backend (separate repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd mindlink-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:9090/api
   VITE_WS_URL=ws://localhost:9090/ws
   VITE_ENVIRONMENT=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📱 User Flows

### For Students
1. **Onboarding**: Visit homepage → Sign up as student → Complete profile
2. **Daily Check-in**: Dashboard → Mood check-in → Optional notes → Track trends
3. **Seek Support**: Dashboard → Request peer chat → Get matched → Chat session
4. **Community**: SpeakUp forum → Browse/search posts → Engage with content
5. **Crisis**: Automatic detection → Resource recommendation → Professional help

### For Volunteers
1. **Application**: Sign up as volunteer → Provide experience/qualifications → Verification
2. **Availability**: Dashboard → Set online status → Receive chat requests
3. **Support Sessions**: Accept requests → Provide peer support → Follow protocols
4. **Monitoring**: Review forum posts → Identify students needing support

## 🔒 Privacy & Security Features

### Data Protection
- **Anonymous Usernames**: No real names required
- **Minimal Data Collection**: Only essential information stored
- **Local Storage**: Sensitive data kept client-side when possible
- **Encryption**: All communications encrypted in transit

### Safety Measures
- **Crisis Detection**: Automatic keyword monitoring
- **Volunteer Verification**: Background checks and training requirements
- **Content Moderation**: Automated and human review systems
- **Emergency Protocols**: Immediate escalation procedures

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3B82F6 (trust, calm)
- **Secondary Purple**: #8B5CF6 (creativity, support)
- **Accent Green**: #10B981 (growth, positivity)
- **Warning Orange**: #F59E0B (attention, caution)
- **Error Red**: #EF4444 (urgency, alerts)

## 📊 Routes & Navigation

### Public Routes
- `/` - Homepage with platform overview
- `/auth` - Authentication (signup/login) for students and volunteers
- `/feed` - Anonymous community posts (guest access)
- `/resources` - Crisis resources and self-care information

### Student Routes (Authenticated)
- `/dashboard` - Student dashboard with mood tracking and quick actions
- `/peer-chat` - Request and engage in peer support chats
- `/speakup` - Community forum for discussions and support
- `/create` - Create new posts for community support

### Volunteer Routes (Authenticated)
- `/volunteer-dashboard` - Volunteer dashboard with chat requests and stats
- `/peer-chat` - Accept and manage peer support sessions
- `/speakup` - Monitor forum and provide community support

---

**MindLink** - Connecting university students with the mental health support they need, when they need it, in a safe and anonymous environment.
