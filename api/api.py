import socket
import threading

from flask import Flask
from flask_socketio import SocketIO, emit

from forzaDataPacket import ForzaDataPacket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('', 5685))
params = ForzaDataPacket.get_props(packet_format='fh4')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')
dataStreaming = False


def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()

    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t


def get_data():
    message, address = server_socket.recvfrom(1024)
    telemetry = ForzaDataPacket(message, packet_format='fh4')
    socketio.emit('telemetry response', telemetry.to_dict(params))


@app.route('/telemetry')
def get_telemetry_packet():
    message, address = server_socket.recvfrom(1024)
    telemetry = ForzaDataPacket(message, packet_format='fh4')
    return telemetry.to_dict(params)


@socketio.on('request data streaming')
def test_message():
    if not dataStreaming:
        set_interval(get_data, 0.2)


if __name__ == '__main__':
    socketio.run(app)
