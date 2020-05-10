/* @flow */
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

const defaultScopeType = ScopeTypes.transient;
const defaultServiceType = ServiceTypes.function;

const ServiceConfigurationBuilderImpl = (
  factory: any,
  parameters: ?Array<Parameter> = [],
  scopeType: ?ScopeType,
  serviceType: ?ServiceType,
): ServiceConfigurationBuilder => {
  const build = (): ServiceConfiguration => {
    return {
      factory,
      parameters: parameters || [],
      scopeType: scopeType || defaultScopeType,
      serviceType: serviceType || defaultServiceType,
    }
  };
  
  const setScopeType = (newScopeType: ScopeType): ServiceConfigurationBuilder => {
    return ServiceConfigurationBuilderImpl(
      factory,
      parameters,
      newScopeType,
      serviceType,
    );
  };

  const setServiceType = (newServiceType: ServiceType): ServiceConfigurationBuilder => {
    return ServiceConfigurationBuilderImpl(
      factory,
      parameters,
      scopeType,
      newServiceType,
    );
  };

  const addDependency = (dependencyName: string): ServiceConfigurationBuilder => {
    const newParameters = [...(parameters || [])];
    newParameters.push({
      type: ParameterTypes.dependency,
      value: dependencyName,
    });
    return ServiceConfigurationBuilderImpl(
      factory,
      newParameters,
      scopeType,
      serviceType,
    );
  };

  const addValue = (value: any): ServiceConfigurationBuilder => {
    const newParameters = [...(parameters || [])];
    newParameters.push({
      type: ParameterTypes.value,
      value,
    });
    return ServiceConfigurationBuilderImpl(
      factory,
      newParameters,
      scopeType,
      serviceType,
    );
  };

  return {
    factory,
    parameters: [],
    scopeType: scopeType || defaultScopeType,
    serviceType: serviceType || defaultServiceType,

    build,
    setScopeType,
    setServiceType,

    addDependency,
    addValue,
  };
};

export default ServiceConfigurationBuilderImpl;
