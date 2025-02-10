// utils/validateImage.ts

export function validateImageFile(file: File): string | null {
    const allowedExtensions = ['jpeg', 'jpg', 'png'];
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
  
    // Extract and validate the file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedExtensions.includes(extension)) {
      return 'Only JPEG, JPG, and PNG files are allowed.';
    }
  
    // Validate the MIME type for additional security
    if (!allowedMimeTypes.includes(file.type)) {
      return 'Invalid image file type.';
    }
  
    return null; // No errors
  }