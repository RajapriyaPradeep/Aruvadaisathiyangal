from pydub import AudioSegment

def compress_mp3(input_file, output_file, bitrate="64k"):
    """
    Compresses an MP3 file by adjusting the bitrate.
    
    Parameters:
        input_file (str): Path to the input MP3 file.
        output_file (str): Path to save the compressed MP3 file.
        bitrate (str): Desired bitrate (default is 64k).
    """
    # Load the MP3 file
    audio = AudioSegment.from_mp3(input_file)
    
    # Export the file with the new bitrate
    audio.export(output_file, format="mp3", bitrate=bitrate)
    print(f"File compressed and saved as: {output_file}")

# Example usage
input_mp3 = "path/to/your/large_audio.mp3"
output_mp3 = "path/to/your/compressed_audio.mp3"

compress_mp3(input_mp3, output_mp3, bitrate="64k")
