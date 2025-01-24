const inventoryTableErrorMessages: { [key: string]: string } = {
    'Tabela não encontrada': 'Tabela não encontrada, possivelmente foi excluída ou houve um erro ao buscar os dados, tente novamente ou verifique se a tabela ainda existe',
    'Tipo do arquivo ou versão do excel não é valido': 'Tipo do arquivo não é valido, verifique se o arquivo é do tipo .xlsx ou a versão do Excel é muito antiga'
}

export default inventoryTableErrorMessages;
