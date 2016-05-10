import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Match}        from 'meteor/check';

// Accepts both React.createElement compatibile values, and object with
// React.createElement compatibile `component` key.
SimpleSchema.extendOptions({
    uniforms: Match.Optional(
        Match.OneOf(
            String,
            Function,
            Match.ObjectIncluding({
                component: Match.Optional(
                    Match.OneOf(
                        String,
                        Function
                    )
                )
            })
        )
    )
});
