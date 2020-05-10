/* @flow */
import Instantiator from './instantiator';
import ServiceConfigurationBuilderImpl from './serviceConfigurationBuilder';
import { ScopeTypes, ServiceTypes, ParameterTypes } from './contants';
import type {
  ScopeType,
  ServiceType,
  ParameterType,
  Parameter,
  ServiceFactory,
  ServiceConfiguration,
  ServiceConfigurationBuilder,
  Configuration,
} from './types';

const create = () => {
  const serviceConfigurations = {};
  const servicePools = {
    [ScopeTypes.singleton]: {},
    default: {},
  };

  const getOrCreateService = (name: string, pool: string): any => {
    // Get Pool
    if (servicePools[pool] == null) {
      servicePools[pool] = {};
    }
    const servicePool: {} = servicePools[pool];

    // Get Service
    if (servicePool[name] == null) {
      servicePool[name] = createService(name, pool);
    }
    const service = servicePool[name];

    return service;
  };

  const getActualParameter = (parameter: Parameter, pool: string) => {
    const { type, value } = parameter;
    if (ParameterTypes.dependency === type) {
      // Dependency
      return getService(value, pool);
    } else {
      // Value
      return value;
    }
  };

  const createService = (name: string, pool: string): any => {
    const configuration: ?ServiceConfiguration = serviceConfigurations[name];
    if (configuration == null) {
      throw new Error('Configuration Not Found');
    }

    const { serviceType, factory, parameters } = configuration;
    const actualParameters = parameters.map(parameter => getActualParameter(parameter, pool));
    if (ServiceTypes.class === serviceType) {
      return Instantiator.newClass(factory, actualParameters);
    } else if (ServiceTypes.function === serviceType) {
      return Instantiator.newFunction(factory, actualParameters);
    } else {
      throw new Error('Unknown Service Type');
    }
  };

  const getService = (name: string, scope: string = 'default'): any => {
    const configuration: ServiceConfiguration = serviceConfigurations[name];
    if (configuration == null) {
      throw new Error('Configuration Not Found');
    }

    const { scopeType } = configuration;
    if (ScopeTypes.singleton === scopeType) {
      return getOrCreateService(name, ScopeTypes.singleton);
    } else if (ScopeTypes.scoped === scopeType) {
      return getOrCreateService(name, scope);
    } else if (ScopeTypes.transient === scopeType) {
      return createService(name);
    } else {
      console.warn(`Unknown Scope Type: ${scopeType}, default to 'transient'`);
      return createService(name);
    }
  };

  const addService = (name, serviceConfiguration: ServiceConfiguration) => {
    serviceConfigurations[name] = serviceConfiguration;
  };

  const flush = (scope: string) => {
    delete servicePools[scope];
  }

  return {
    addService,
    getService,
    flush,
  };
};

export default {
  ScopeTypes,
  ServiceTypes,

  create,
  ServiceConfigurationBuilder: ServiceConfigurationBuilderImpl,
}