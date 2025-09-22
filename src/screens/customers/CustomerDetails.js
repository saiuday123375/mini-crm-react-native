import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Alert } from 'react-native';
import { Text, List, FAB, Title, TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function CustomerDetails({ route }) {
  const { customer } = route.params;
  const [leads, setLeads] = useState([
    { id:'1', title:'New Website', status:'New', value:5000 },
    { id:'2', title:'App Development', status:'Contacted', value:8000 }
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const LeadSchema = Yup.object().shape({
    title: Yup.string().required('Title required'),
    status: Yup.string().required('Status required'),
    value: Yup.number().required('Value required').positive('Value must be positive')
  });

  return (
    <View style={styles.container}>
      <Title>{customer.name}</Title>
      <Text>Email: {customer.email}</Text>
      <Text>Phone: {customer.phone}</Text>

      <Title style={{marginTop:20, marginBottom:10}}>Leads</Title>
      <View style={{flex:1}}>
        {leads.length === 0 ? (
          <Text>No leads</Text>
        ) : (
          <FlatList
            data={leads}
            renderItem={({item}) => (
              <List.Item 
                title={item.title} 
                description={`Status: ${item.status} | Value: $${item.value}`} 
                onPress={() => Alert.alert('Lead', item.title)} 
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      <FAB style={styles.fab} icon="plus" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{flex:1, padding:20}}>
          <Title>Add Lead</Title>
          <Formik
            initialValues={{title:'', status:'', value:''}}
            validationSchema={LeadSchema}
            onSubmit={(values, { resetForm }) => {
              const newLead = { id:(leads.length + 1).toString(), ...values };
              setLeads([...leads, newLead]);
              Alert.alert('Added', values.title);
              resetForm();
              setModalVisible(false);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View>
                <TextInput
                  label="Title"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  error={touched.title && errors.title}
                  style={styles.input}
                />
                {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}

                <TextInput
                  label="Status"
                  value={values.status}
                  onChangeText={handleChange('status')}
                  onBlur={handleBlur('status')}
                  error={touched.status && errors.status}
                  style={styles.input}
                />
                {touched.status && errors.status && <Text style={styles.error}>{errors.status}</Text>}

                <TextInput
                  label="Value"
                  value={values.value}
                  onChangeText={handleChange('value')}
                  onBlur={handleBlur('value')}
                  keyboardType="numeric"
                  error={touched.value && errors.value}
                  style={styles.input}
                />
                {touched.value && errors.value && <Text style={styles.error}>{errors.value}</Text>}

                <Button mode="contained" onPress={handleSubmit} style={{marginTop:20}}>Add Lead</Button>
                <Button onPress={() => setModalVisible(false)} style={{marginTop:10}}>Cancel</Button>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:20 },
  fab: { position:'absolute', right:16, bottom:16 },
  input: { marginBottom:10 },
  error: { color:'red', fontSize:12, marginBottom:5 }
});
