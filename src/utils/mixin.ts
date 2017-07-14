import "core-js";

export function mixin(behaviour: any, sharedBehaviour: any = {}) {
  // these keys reflect the behaviour that is to be attached to class instances
  const instanceKeys = Reflect.ownKeys(behaviour);
  // these keys reflect static behaviour
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol("isA");

  function _mixin(workingClass: any) {
    // attach instance-oriented behaviour
    for (const property of instanceKeys) {
      Object.defineProperty(
        workingClass.prototype,
        property,
        {
          value: behaviour[property],
          writable: true,
        },
      );
    }

    Object.defineProperty(workingClass.prototype, typeTag, {value: true});

    // attach static behaviour
    for (const property of sharedKeys) {
      Object.defineProperty(
        workingClass,
        property,
        {
          enumerable: sharedBehaviour.propertyIsEnumerable(property),
          value: sharedBehaviour[property],
          writable: true,
        },
      );
    }
  }

  // this allows you to use "instanceof" on an object that uses a mixin
  Object.defineProperty(
    _mixin,
    Symbol.hasInstance,
    {
      value: (instance: any) => !!instance[typeTag],
      writable: true,
    },
  );

  return _mixin;
}

export default mixin;
