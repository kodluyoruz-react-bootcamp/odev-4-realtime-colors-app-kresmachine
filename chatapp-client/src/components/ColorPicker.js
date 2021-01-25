function ColorPicker({ colorRef }) {
    return (
        <div>
            <input type="color" ref={colorRef} />
        </div>
    );
}

export default ColorPicker;