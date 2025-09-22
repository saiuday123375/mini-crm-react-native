import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import { List, FAB, Text, Appbar, TextInput, Button, Title } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function CustomerList({ navigation }) {
  const [customers, setCustomers] = useState([
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const CustomerSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().email('Invalid email').required('Email required'),
    phone: Yup.string().required('Phone required'),
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Customers" />
      </Appbar.Header>

      <View style={styles.container}>
        <FlatList
          data={customers}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={item.email}
              onPress={() => navigation.navigate('CustomerDetails', { customer: item })}
            />
          )}
          keyExtractor={item => item.id}
        />

        <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex:1, padding:20 }}>
          <Title>Add Customer</Title>
          <Formik
            initialValues={{ name:'', email:'', phone:'' }}
            validationSchema={CustomerSchema}
            onSubmit={(values,{resetForm})=>{
              const newCustomer = { id: (customers.length+1).toString(), ...values };
              setCustomers([...customers,newCustomer]);
              Alert.alert('Added', values.name);
              resetForm();
              setModalVisible(false);
            }}
          >
            {({handleChange,handleBlur,handleSubmit,values,errors,touched})=>(
              <>
                <TextInput label="Name" value={values.name} onChangeText={handleChange('name')} onBlur={handleBlur('name')} error={touched.name && errors.name} style={styles.input}/>
                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

                <TextInput label="Email" value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} error={touched.email && errors.email} style={styles.input}/>
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <TextInput label="Phone" value={values.phone} onChangeText={handleChange('phone')} onBlur={handleBlur('phone')} error={touched.phone && errors.phone} style={styles.input}/>
                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                <Button mode="contained" onPress={handleSubmit} style={{ marginTop:20 }}>Add</Button>
                <Button onPress={()=>setModalVisible(false)} style={{ marginTop:10 }}>Cancel</Button>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:10 },
  fab: { position:'absolute', right:16, bottom:16 },
  input:{ marginBottom:10 },
  error:{ color:'red', fontSize:12, marginBottom:5 }
});
