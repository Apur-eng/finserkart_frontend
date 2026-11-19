import { useContext } from 'react';
import { DemoContext, type DemoContextValue } from './demoContextDef';

export function useDemo(): DemoContextValue {
  return useContext(DemoContext);
}

export default useDemo;
