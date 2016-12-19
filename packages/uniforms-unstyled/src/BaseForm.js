import {BaseForm} from 'uniforms';

const Unstyled = parent => class extends parent {
    static Unstyled = Unstyled;

    static displayName = `Unstyled${parent.displayName}`;
};

export default Unstyled(BaseForm);
