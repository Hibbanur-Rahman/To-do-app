import React, { useState } from 'react';
import { StyleSheet ,View,Text} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';
import ArrowDownSvg from './arrowDownSvg';


const data = [
  { label: 'Office Project', value: 'office-project' },
  { label: 'work', value: 'work' },
  { label: 'study', value: 'study' },
  { label: 'gym', value: 'gym' },
  { label: 'other', value: 'other' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <View style={{position:'relative'}}>
    <Text style={styles.taskGroupCardParaText}>Task Group</Text>
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      renderRightIcon={
        ()=>(
            <ArrowDownSvg/>
        )
      }
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item)=> {
        setValue(item.value);
      }}
      
      renderLeftIcon={() => (
        <View
        style={{
          backgroundColor: '#ffe9e1',
          borderRadius: 10,
          padding: 9,
          marginRight: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <IconFontAwesome name="briefcase" size={20} color="#f478b8" />
      </View>
        // <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      )}
    />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.2,
    backgroundColor: '#fff',
    marginBottom: 20,
    color:'#000'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'LexendDeca-Medium',
    marginTop:15
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'LexendDeca-Medium',
    marginTop:15
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  taskGroupCardParaText: {
    fontSize: 13,
    fontFamily: 'LexendDeca-Regular',
    position:'absolute',
    zIndex:2,
    left:66,
    top:17,
    color:'#726e80'

  },
});