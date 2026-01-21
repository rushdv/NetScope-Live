from flask import Flask
from flask_socketio import SocketIO
from scapy.all import show_interfaces
show_interfaces()
from scapy.all import sniff
from threading import Thread
import time
import json

# Setup
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

# Global control variable
is_sniffing = True

def packet_callback(packet):
    global is_sniffing
    print(f"DEBUG: Packet captured! Len: {len(packet)}")

    if not is_sniffing:
        return
    
    if packet.haslayer('IP'):

        if len(packet) < 100:
            return
        
        try:
            # Basic packet info 
            packet_date = {
                "id": time.time(),
                "src": packet['IP'].src,
                "dst": packet['IP'].dst,
                "proto": packet['IP'].proto,
                "len": len(packet),
                "timestamp": time.strftime("%H:%M:%S")
            }

            # Emit to frontend immediately
            socketio.emit('new_packet', packet_date)
        except Exception as e:
            print(f"Error processing packet: {e}")

def sniffer_thread():
    sniff("Wi-Fi", prn=packet_callback, store=0)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

if __name__ == '__main__':
    print("NetScope Server Starting...")

    t = Thread(target=sniffer_thread)
    t.daemon = True
    t.start()

    socketio.run(app, port=5000)