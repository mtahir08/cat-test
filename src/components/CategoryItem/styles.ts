import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '45%',
    aspectRatio: 1,
    marginVertical: 10,
    marginHorizontal: '2.5%',
    borderRadius: 5,
    backgroundColor: '#FFAC81',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#fff'
  },
});

export default styles;
