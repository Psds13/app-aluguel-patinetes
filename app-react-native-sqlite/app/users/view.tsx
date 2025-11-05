import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { deleteUser, getUsers, Usuario } from "../../services/userService";
import { router, useLocalSearchParams } from "expo-router";

export default function UserViewScreen() {
  const params = useLocalSearchParams();
  const userId = Number(params.id);

  const [user, setUser] = useState<Usuario | undefined>();

  useEffect(() => {
    getUsers().then((users) => {
      setUser(users.find((u) => u.id === userId));
    });
  }, []);

  if (!user) return <Text>Carregando...</Text>;

  const handleDelete = async () => {
    await deleteUser(user.id!);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.nome}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Telefone: {user.telefone}</Text>

      <Button title="Editar" onPress={() => router.push({ pathname: "/users/form", params: { id: user.id } })} />
      <Button title="Excluir" onPress={handleDelete} />
      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 8 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 10 }
});
