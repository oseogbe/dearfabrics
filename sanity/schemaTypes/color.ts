import ColorPicker from '../../components/ColorPickerInput'

export default {
    name: 'color',
    title: 'Color',
    type: 'object',
    inputComponent: ColorPicker,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'code',
            title: 'Code',
            type: 'string',
        }
    ]
}