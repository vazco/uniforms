import { BaseForm } from 'uniforms';

function Mantine(parent: any) {
  class _ extends parent {
    static Mantine = Mantine;

    static displayName = `Mantine${parent.displayName}`;
  }

  return _ as unknown as typeof BaseForm;
}

export default Mantine(BaseForm);
