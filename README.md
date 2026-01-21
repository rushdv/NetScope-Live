# ⚡ NetScope-Live

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/Python-3.8%2B-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4)

> **A real-time, cyberpunk-styled network traffic visualizer.**
> *Watch your network packets fly by in a live dashboard.*

---

## 📸 Screenshots

![Dashboard Screenshot](https://via.placeholder.com/800x400?text=Paste+Your+Screenshot+Here)
*(Add your own screenshot here later!)*

---

## 🚀 About The Project

**NetScope-Live** bridges the gap between low-level network operations and high-level visualization. 

Most network sniffers (like Wireshark) are powerful but overwhelming. NetScope-Live provides a **gamified, movie-style dashboard** that visualizes:
* 📉 **Live Bandwidth Usage** (Real-time graphs)
* 📦 **Packet Stream** (Source, Destination, Protocol, Size)
* 🛡️ **Protocol Detection** (HTTP, HTTPS, TCP, UDP)

It is built using a **Hybrid Architecture**:
* **Backend:** Python (Flask + Scapy) for raw packet capture.
* **Frontend:** React + Tailwind CSS for high-performance rendering.
* **Bridge:** WebSockets (Socket.IO) for millisecond-latency updates.

---

## 🛠️ Prerequisites

Before you start, ensure you have the following installed:

1.  **Node.js** (v16+)
2.  **Python** (v3.8+)
3.  **[Windows Only] Npcap:**
    * You **MUST** install [Npcap](https://npcap.com/#download) to allow Python to read Wi-Fi traffic.
    * *Critical:* During installation, check the box **"Install Npcap in WinPcap API-compatible Mode"**.

---

## 📥 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/rushdv/NetScope-Live.git
cd NetScope-Live
```

### 2. Setup Backend (Python)
Open a terminal in the server folder:

```bash
cd server
pip install -r requirements.txt
```
(If requirements.txt is missing, run: `pip install flask flask-socketio scapy eventlet`)

### 3. Setup Frontend (React)
Open a new terminal in the client folder:

```bash
cd client
npm install
```

---

## ⚡ How to Run
You need to run the Backend and Frontend in two separate terminals.

### Terminal 1: The Backend (Python)
⚠️ **IMPORTANT:** You must run this as Administrator (Windows) or sudo (Linux) to access the network card.

```bash
cd server
# Windows (Run PowerShell as Admin)
python app.py

# Linux / Mac
sudo python3 app.py
```
You should see: `🚀 NetScope Server Starting...`

### Terminal 2: The Frontend (React)
```bash
cd client
npm run dev
```
Click the link (usually http://localhost:5173) to open your dashboard.

---

## 🔮 Future Roadmap
I am actively working on making NetScope-Live a universal tool for all developers.

- [x] Windows Support (Stable)
- [ ] Cross-Platform Auto-Detection: Upcoming update will support Linux and MacOS natively without code changes.
- [ ] Geo-Location: Visualizing where packets are going on a 3D Globe.
- [ ] Security Alerts: Auto-detect phishing links or unencrypted traffic.

---

## ❓ Troubleshooting

**"Total Packets stays at 0"**
* Did you run the Python terminal as Administrator?
* Did you install Npcap (Windows)?
* Are you connected to a VPN? (Try disconnecting it).

**"Connection Refused"**
* Ensure the Python server is running on port 5000.
* Check if your Firewall blocked the connection (Allow Python access).

---

## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.
