import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { useIsFocused } from "@react-navigation/native"
import useStorage from "../../hooks/useStorage"

import { PasswordItem } from "./components/passwordItem"
// useState = "efeito colateral"
// useEffect = Controle de foco
export function Passwords(){
    const [listPasswords, setListPasswords] = useState([]) 
    const focused = useIsFocused(); // aponta o foco de tela
    const { getItem, removeItem } = useStorage();

    // NOVO
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //Carrega as senhas do localStorage para a lista de senhas.
    useEffect(() => {
        async function loadPasswords(){
            const passwords = await getItem("@pass"); // MESMA CHAVE DO MODAL para IDENTIFICAR O BANCO DE BUSCA
            setListPasswords(passwords);
        }

        loadPasswords();
    }, [focused])
    
    async function handleDeletePassword(item){
        const passwords = await removeItem("@pass", item)
        setListPasswords(passwords)
    }


    return(
        // Mantem texto fora da barra superior do celular
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF"}}>
            
            <View style={styles.header}>
                <Text style={styles.title}>Minhas Senhas</Text>
            </View>

            <View style={styles.content}>
            <FlatList 
                style={{flex: 1, paddingTop: 14}}
                data={listPasswords} // pega os dados
                keyExtractor={ (item) => String(item) } // identifica cada item unico
                //renderItem={({item})=><Text>{item}</Text>}
                renderItem={({item}) => <PasswordItem  data={item} removePassword={ () => handleDeletePassword(item)}/> }
            />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#20B2AA",
        paddingTop: 58,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },

    title:{
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
    },

    content:{
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,
    }
})