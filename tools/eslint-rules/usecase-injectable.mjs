// @ts-nocheck
export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require @Injectable() decorator on classes ending with UseCase',
      recommended: false,
    },
    schema: [],
    messages: {
      missingInjectable:
        'Classes with names ending in "UseCase" must be decorated with @Injectable().',
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        const id = node.id;
        if (!id || !id.name || !/UseCase$/.test(id.name)) {
          return;
        }

        const decorators = node.decorators || [];
        const hasInjectable = decorators.some((decorator) => {
          const expr = decorator.expression;
          if (!expr) return false;

          // @Injectable()
          if (expr.type === 'CallExpression') {
            const callee = expr.callee;
            if (callee && callee.type === 'Identifier' && callee.name === 'Injectable') {
              return true;
            }
          }

          // @Injectable
          if (expr.type === 'Identifier' && expr.name === 'Injectable') {
            return true;
          }

          return false;
        });

        if (!hasInjectable) {
          context.report({ node: id, messageId: 'missingInjectable' });
        }
      },
    };
  },
}; 