import { BaseForm } from 'uniforms';

function Mantine(parent: any) {
  class _ extends parent {
    static Mantine = Mantine;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions -- comes from uniform's core
    static displayName = `Mantine${parent.displayName}`;
  }

  return _ as unknown as typeof BaseForm;
}

export default Mantine(BaseForm);
