export const downloadExcel = (fileContent: string, fileName: string) => {
    const byteCharacters  = atob(fileContent); 
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
    }

    const blob = new Blob([new Uint8Array(byteArrays)], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});

    const tempUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = tempUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(tempUrl);
}