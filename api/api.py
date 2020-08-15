import socket

from flask import Flask
from flask_socketio import SocketIO, emit

from forzaDataPacket import ForzaDataPacket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('', 5685))
params = ForzaDataPacket.get_props(packet_format='fh4')

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/telemetry')
def get_telemetry_packet():
    message, address = server_socket.recvfrom(1024)
    telemetry = ForzaDataPacket(message, packet_format='fh4')
    return telemetry.to_dict(params)


@socketio.on('request telemetry')
def test_message(message):
    message, address = server_socket.recvfrom(1024)
    telemetry = ForzaDataPacket(message, packet_format='fh4')
    emit('telemetry response', telemetry.to_dict(params), broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
