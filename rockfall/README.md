# RockSafe AI — Real-Time Mining Safety Monitoring Dashboard

An enterprise-grade, responsive geotechnical and environmental mining safety monitoring dashboard built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Key Features

### 1. Dashboard Overview
- **Dynamic Risk Score Semicircular Gauge**: Real-time 0–100 geotechnical hazard score with smooth animated transitions and color coding (Low, Medium, High, Critical).
- **Interactive Mining Sector Heatmap**: Visual map of underground mine sectors with color-coded risk levels, active miner counts, micro-vibration/temperature metrics, and hover tooltips.
- **5 Sensor Summary KPI Cards**: Live telemetry cards for **Tilt Sensors**, **Vibration**, **Moisture**, **Temperature**, and **Humidity** with status badges and unit markers.
- **Sensor Network Status Table**: Comprehensive real-time status matrix with relative timestamps, color-coded badges, search, and type/status filters.
- **Interactive Sensor Detail Modal**: Detailed telemetry node inspection with battery percentage, signal strength, depth level, and zero-calibration controls.

### 2. Sensors Analysis
- **Vibration Levels (Last 3 Hours)**: Animated Recharts time-series line chart in vibrant red with interactive tooltips and seismic acoustic limits.
- **Temperature Trends (Last 3 Hours)**: Animated Recharts time-series line chart in amber/yellow reflecting strata ambient heat.
- Shared sensor network status table with search and filtering.

### 3. Sensor Locator (Miner Tracking Radar)
- **Underground Mining Blueprint**: Custom dark cavern layout with **Sector Alpha**, **Sector 3 West**, and concentric sonar tracking rings.
- **Dynamic Miner Location Markers**: Real-time simulated movement of underground workers with miner IDs (`ID: M-452`, `ID: M-453`, `ID: M-483`, `ID: M-462`).
- **Hazard Zone Perimeter**: Red dashed boundary highlighting active rockfall hazard zones.
- **Miner Roster & Status**: Interactive worker list showing heart rate, oxygen levels, depth, and communication pings.
- **Rescue & Alerts Console**: Emergency response module featuring an SOS distress signal from ID-112 and interactive rescue team dispatching.

### 4. Geomechanical Analytics & AI Forecasting
- **Historical Trends (7 Days)**: Bar chart displaying daily aggregated geotechnical risk scores with green and orange threshold bars.
- **AI Risk Prediction Model**: Smooth oscillating neural risk probability curve with interactive tooltips.
- **Analytics KPI Cards**: Demonstration metrics for Prediction Accuracy (94.7%), Next Risk Assessment (12 min), and Model Confidence (High, 87%).
- **Time-range Selector**: Switch seamlessly between 24 Hours, 7 Days, and 30 Days.

### 5. Alerts & Incident Dispatch
- Searchable, severity-filtered incident table (Critical, High, Warning, Normal).
- Dismissible alert items and automated threshold violation detection.
- **Sound Alert Demo**: Web Audio API industrial dual-tone siren/beep synthesizer.
- Manual test alert generator and "Clear All" capability.

### 6. Safety & Geotechnical Reports
- **Daily Safety Report**: Frontend PDF generation using `jsPDF` with comprehensive sensor tables and geotechnical assessments.
- **Weekly Analytics Report**: Real-time CSV export of sensor telemetry logs.
- **Custom Report Builder Modal**: Configurable date range, sensor type selector, compliance toggles, and multi-format export (PDF or CSV).

### 7. Configurable Thresholds
- Interactive calibration sliders and number inputs for Vibration, Temperature, Moisture, Humidity, and Tilt.
- Visual tri-color trigger spectrum preview bar (Normal, Warning, Critical).
- Instant state propagation: changes immediately recalibrate risk scores, sensor statuses, and automated alerts across all pages.
- Persistent state in `localStorage` with a 1-click "Reset Defaults" option.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 with bespoke industrial dark purple & charcoal theme tokens
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Framer Motion
- **PDF Generation**: jsPDF
- **Routing**: React Router v7 (`react-router-dom`)
- **State Management**: Centralized React Context (`SensorContext` & `ThemeContext`) with `localStorage` persistence

---

## 📦 Getting Started

### 1. Installation
Navigate to the project directory and install dependencies:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Production Build
```bash
npm run build
```
Preview the production build:
```bash
npm run preview
```

---

## 🧪 Simulation Controls

- **Live Monitoring Indicator**: Pulsing green beacon in the top bar indicates active background telemetry.
- **Simulating / Paused Toggle**: Pause or resume the random-walk simulation at any time from the top bar.
- **Alert Sound Demo**: Click the sound button in the top navigation bar to play the synthesized safety siren.
- **Theme Toggle**: Switch between Dark Purple (default) and Light mode.
