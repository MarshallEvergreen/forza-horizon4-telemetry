#!/usr/env/python
# -*- coding: utf-8 -*-
"""
Script to listen on a given port for UDP packets sent by a Forza Motorsport 7
"data out" stream and write the data to a TSV file.

Copyright (c) 2018 Morten Wang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import datetime as dt
import logging
import socket

from forzaDataPacket import ForzaDataPacket


def dump_stream(port, output_filename, append=False, packet_format='dash', config_file=None):
    """
    Opens the given output filename, listens to UDP packets on the given port
    and writes data to the file.

    :param port: listening port number
    :type port: int

    :param output_filename: path to the file we will write to
    :type output_filename: str

    :param append: if set, the output file will be opened for appending and
                   the header with column names is not written out
    :type append: bool

    :param packet_format: the packet format sent by the game, one of either
                          'sled' or 'dash'
    :type packet_format str

    :param config_file: path to the YAML configuration file
    :type config_file: str
    """

    params = ForzaDataPacket.get_props(packet_format=packet_format)

    log_wall_clock = False
    if 'wall_clock' in params:
        log_wall_clock = True

    server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    server_socket.bind(('', port))

    logging.info('listening on port {}'.format(port))

    n_packets = 0

    while True:
        message, address = server_socket.recvfrom(1024)
        fdp = ForzaDataPacket(message, packet_format=packet_format)
        if log_wall_clock:
            fdp.wall_clock = dt.datetime.now()

        if fdp.is_race_on:
            if n_packets == 0:
                logging.info('{}: in race, logging data'.format(dt.datetime.now()))

            current_data = fdp.to_list(params)
            current_data_dict = fdp.to_dict(params)
            n_packets += 1
        else:
            if n_packets > 0:
                logging.info('{}: out of race, stopped logging data'.format(dt.datetime.now()))
            n_packets = 0


def main():
    import argparse

    cli_parser = argparse.ArgumentParser(
        description="script that grabs data from a Forza Motorsport stream and dumps it to a TSV file"
    )

    # Verbosity option
    cli_parser.add_argument('-v', '--verbose', action='store_true',
                            help='write informational output')

    cli_parser.add_argument('-a', '--append', action='store_true',
                            default=False, help='if set, data will be appended to the given file')

    cli_parser.add_argument('-p', '--packet_format', type=str, default='dash',
                            choices=['sled', 'dash', 'fh4'],
                            help='what format the packets coming from the game is, either "sled" or "dash"')

    cli_parser.add_argument('-c', '--config_file', type=str,
                            help='path to the YAML configuration file')

    cli_parser.add_argument('port', type=int,
                            help='port number to listen on')

    cli_parser.add_argument('output_filename', type=str,
                            help='path to the TSV file we will output')

    args = cli_parser.parse_args()

    if args.verbose:
        logging.basicConfig(level=logging.INFO)

    dump_stream(args.port, args.output_filename, args.append,
                args.packet_format, args.config_file)

    return ()


if __name__ == "__main__":
    main()
