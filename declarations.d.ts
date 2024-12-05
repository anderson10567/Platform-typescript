declare module '*.scss' {
  const styles: { [className: string]: string }; export default styles;
 }
    declare module '*.png' {
        const value: string;
        export default value;
      }

      declare module '@hookform/resolvers/yup' {
        import { Resolver } from 'react-hook-form';
        import * as Yup from 'yup';
      
        export function yupResolver<Values>(
          schema: Yup.Schema<any>
        ): Resolver<Values>;
      }

    declare module '*../../redux/article-reducer' {}
        
        declare module '*../error/error' {
        const Error: React.FC;
        export default Error;
        }

        declare module './reducer' {
             import { AnyAction } from 'redux'; 
            import { Reducer } from 'redux';
          
            const rootReducer: Reducer; 
            export default rootReducer;
          }

          declare module '*.js' {
            const content: any;
            export default content;
          }
