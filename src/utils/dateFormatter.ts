export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
  
    const day = date.getDate().toString().padStart(2, "0"); // Pastikan 2 digit (ex: 04)
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${month} ${day}, ${year}`;
  };
  