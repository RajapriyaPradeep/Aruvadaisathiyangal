import os

# def extract_file_names(directory):
#     """
#     Extracts file names from all files in a directory, including subfolders.
    
#     Parameters:
#         directory (str): Path to the directory to scan.
        
#     Returns:
#         list: List of file names (with extensions) in the directory.
#     """
#     file_names = []
#     for root, _, files in os.walk(directory):
#         for file in files:
#             file_names.append(file)
#     return file_names

# # Example usage
# folder_path = "C:/Users/rajap/Downloads/GOSPEL IN THE HEAVEN-20241225T001337Z-001/GOSPEL IN THE HEAVEN"
# file_names = extract_file_names(folder_path)

# print("Files found:")
# for name in file_names:
#     print(name)


#-------------------------------------------------------
#rename the file name by removing the space,.
#-------------------------------------------------------
import os
# import shutil
# import re

# def clean_file_name(file_name):
#     """
#     Cleans the file name by removing special characters including spaces, commas, and dashes, except for the .mp3 extension.

#     Parameters:
#         file_name (str): Original file name.

#     Returns:
#         str: Cleaned file name.
#     """
#     name, ext = os.path.splitext(file_name)
#     if ext.lower() == ".mp3":
#         # Remove special characters including spaces, commas, and dashes
#         name = re.sub(r'[.,#_/ -]', '', name)  # Explicitly match spaces and other special characters
#     return f"{name}{ext}"

# def copy_and_rename_files(src_folder, dest_folder):
#     """
#     Copies files from the source folder to the destination folder and renames them.

#     Parameters:
#         src_folder (str): Path to the source folder.
#         dest_folder (str): Path to the destination folder.
#     """
#     # Create destination folder if it doesn't exist
#     os.makedirs(dest_folder, exist_ok=True)

#     for root, _, files in os.walk(src_folder):
#         for file in files:
#             old_file_path = os.path.join(root, file)
#             cleaned_file_name = clean_file_name(file)
#             new_file_path = os.path.join(dest_folder, cleaned_file_name)

#             # Copy the file to the new destination with the cleaned file name
#             shutil.copy2(old_file_path, new_file_path)
#             print(f"Copied and renamed: {old_file_path} -> {new_file_path}")

# # Example usage
# source_folder = "C:/Users/rajap/Downloads/GOSPEL IN THE HEAVEN-20241225T001337Z-001/convert"
# destination_folder = "C:/Users/rajap/Downloads/GOSPEL IN THE HEAVEN-20241225T001337Z-001/rename"
# copy_and_rename_files(source_folder, destination_folder)

#--------------------------------------------------------
#Extract the file name uploaded in the github
#--------------------------------------------------------
def extract_file_names(directory):
    """
    Extracts file names from all files in a directory, including subfolders.
    
    Parameters:
        directory (str): Path to the directory to scan.
        
    Returns:
        list: List of file names (with extensions) in the directory.
    """
    file_names = []
    for root, _, files in os.walk(directory):
        for file in files:
            file_names.append(file)
    return file_names

# Example usage
folder_path = "C:/Users/rajap/Downloads/GOSPEL IN THE HEAVEN-20241225T001337Z-001/rename"
file_names = extract_file_names(folder_path)

print("Files found:")
for name in file_names:
    print(name)