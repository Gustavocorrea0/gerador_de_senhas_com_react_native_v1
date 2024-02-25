import AsyncStorage from "@react-native-async-storage/async-storage";
// SALVAR DADOS NO DISPOSITIVO
const useStorage = () => {
    
    // key parametro de busca
    // await = espera a resposta

    // Buscar itens salvos
    const getItem = async(key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);
            // Converte o(s) itens em um array, caso contrario array vazio
            return JSON.parse(passwords) || [];
        } catch (error) {
            console.log("Erro ao buscar", error)
            return [];
        }
    }

    /*
        LOGICA DE SAVE:
        - Busca os dados cadastrados, re-cadastra os mesmos e
        adiciona mais um
    */

    // Salvar item
    const saveItem = async (key, value) => {
        try {
            // Busca itens
            let passwords = await getItem(key);
            passwords.push(value)

            // Salvar no asyncStorage
            // Converter o array(JSON) para string
            await AsyncStorage.setItem(key, JSON.stringify(passwords))
        } catch (error) {
            console.log("Erro ao salvar", error);
        }
    }

    /*
        LOGICA DE REMOVE:
        - Busca as informações, remove da lista os itens cadastrados
        com uma filtragem
    */

    // Remover item
    const removeItem = async (key, item) => {
        try{
            let passwords = await getItem(key);

            // Filtra com base em um condição
            let myPasswords = passwords.filter( (password) => {
                return (password !== item)
            });

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords))
            return myPasswords
            
        } catch (error) {
            console.log("Erro ao salvar", error);
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }

}

export default useStorage;