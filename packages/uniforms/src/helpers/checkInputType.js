export default function checkInputType (typeName) {
    const allowedTypes = [
        'text',
        'checkbox',
        'color',
        'date',
        'datetime',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'pasword',
        'radio',
        'range',
        'reset',
        'search',
        'tel',
        'time',
        'url',
        'week',
    ];
    
    return typeof typeName === 'string' && typeName.length > 0 && allowedTypes.indexOf(typeName) < 0;
}
