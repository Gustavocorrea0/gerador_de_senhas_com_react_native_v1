// imports
import { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native"
import Slider from "@react-native-community/slider"

// importar classe
import { ModalPassword } from "../../components/modal"

let chaset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*"
// Criar componente
// Componente (App) primeira letra maiuscula
export function Home (){
  /*
    - State cria algo mutavél (Dinamico), sem necessidade de atualizacao
    UseState retorna um array com 2 posições. A posição zero é o valor(size) e a posisão um para uma função/Ação desse valor
    - Utilizar Letra minuscula
    Exemplo: 
    - O uso de size pega o valor de useState
    - O uso de SetSize altera o valor de useState
    */
  const [size, SetSize] = useState(20)
  const [password, SetPassword] =  useState("") 
  const [modalVisible, SetModalVisible] = useState(false)
  // Funcao de JavaScript que gera a senha
  function generatePassword() {
    let password = "";
    // Busca uma letra aleatoria com base no tamanho
    // charAt() pega uma string
    // Math.floor() numero inteiro
    // Math.floor() numero random

    

    for (let i = 0, n = chaset.length;  i < size; i++) {
      password += chaset.charAt(Math.floor(Math.random() * n))
    }

    SetPassword(password) // APRESENTA A SENHA
    SetModalVisible(true)
  }

  return (
    // View =  espaço em tela |  estilos no final da pagina | Container
    // Text = adiciona text
    // StyleSheet  = criar o estilo do texto
    // Image = adiciona imagem
    // Utilizar {} para chamar o JavaScript
    // TouchableOpacity = cria um botão
    // onPress = criar ação do clique
    // Modal =  apresenta a tela sobreposta
    // animationType = é o tipo de animação para abrir a tela
    // transparent = deixa o modal (ou outro componente) transparente
    // <ModalPassword password={password}/> = repassa o valor de passwordValue
    <View style={styles.container}>
      <Image 
      // "../../" volta para determinada pasta
      source={require("../../assets/cadeado.png")}
      style={styles.logo}
      />

      <Text style={styles.title}>{size} CARACTERES</Text>

      <View style={styles.area}>
        <Slider
          style={{height: 50}}
          //  Valores minimo e maximo de tamanho do slider
          minimumValue={6}
          maximumValue={20}
          //  Cores para valores minimos e maximos
          minimumTrackTintColor="blue"
          maximumTrackTintColor="red"
          // Mudar a cor da bolinha
          thumbTintColor="purple"
          // Preenchimento da variavél size com o slider
          value={size}
          onValueChange={ (value) => SetSize(value.toFixed(0)) } // Recebe uma função anonima do JavaScript | toFixed() limita o numero de casas decimais
        />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={generatePassword}> 
          <Text style={styles.textButton}>Gerar Senha</Text> 
      </TouchableOpacity>

      
      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword password={password} handleClose={ () => SetModalVisible(false)}/>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#F5F5F5",
    // Alinha o elemento no centro
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo:{
    marginBottom: 60
  },

  title:{
    fontSize: 30,
    fontWeight: "bold" // Define o tipo de fonte
  },

  area: {
    margin: 14, // Define a margem ao redor da área
    marginBottom: 14, // Define a margem inferior da área
    width: "80%", // Define a largura da area
    backgroundColor: "#FFF", // Define a cor da área
    borderRadius: 8, // Define o raio dos cantos da área, criando cantos arredondados
    padding: 6 // Define o preenchimento interno da área, afetando a distância entre o conteúdo e a borda da área
  },

  button: {
    backgroundColor: "#20B2AA",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center", // Define como o conteúdo dentro do botão é justificado ao longo do eixo principal
    borderRadius: 8,
    marginBottom: 18 // Define a margem inferior do elemento
  },

  textButton: {
    color: "#FFF",
    fontSize: 20
  }

})