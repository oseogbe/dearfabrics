import { ChromePicker, ColorResult } from 'react-color'
import { StringInputProps, set, unset } from "sanity"

const ColorPickerInput = (props: StringInputProps) => {
    const { onChange, value = '' } = props

    const handleColorChange = (color: ColorResult) => {
        onChange(set(color.hex))
    }

    return (
        <ChromePicker
            color={value}
            onChangeComplete={handleColorChange}
        />
    )
}

export default ColorPickerInput