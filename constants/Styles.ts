import { StyleSheet } from 'react-native';
import { Colors } from './Colors';

export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
});