import socket

from flask import Flask

from forzaDataPacket import ForzaDataPacket

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.bind(('', 5685))
params = ForzaDataPacket.get_props(packet_format='fh4')

app = Flask(__name__)


@app.route('/telemetry')
def get_telemetry_packet():
    telemetry = None
    while not telemetry:
        message, address = server_socket.recvfrom(1024)
        telemetry = ForzaDataPacket(message, packet_format='fh4')

    return telemetry.to_dict(params)
