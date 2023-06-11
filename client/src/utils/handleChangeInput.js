export const handleChange = (name, value, setData) => {
    setData(data => {
        return { ...data, [name]: value };
    });
}