# Include standard modules
import argparse

# Initiate the parser
parser = argparse.ArgumentParser()

# Add long and short argument
parser.add_argument("--ratio", "-r", help="set ratio")
parser.add_argument("--min", "-n", help="set min")
parser.add_argument("--max", "-m", help="set max")

# Read arguments from the command line
args = parser.parse_args()

print(((float(args.max) - float(args.min)) * float(args.ratio)) + float(args.min))
