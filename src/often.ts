import { useDispatch } from "react-redux";
import { AppDispatch } from "./redux/store";

type Typed<T> = { type: T };

/**
 * Метод для создания action-creatorа по переданным параметрам.
 * Полученный action-creator может быть использован как в контейнерах, так и в редьюсерах для типизации полученного экшена.
 * Значение типа экшена будет содержаться в поле type сгенерированного action-creatorа
 * @param type Тип возвращаемого экшена. Формируется по принципу "ИМЯ_ДОМЕННОЙ_ОБЛАСТИ / названиеЭкшена"
 * @param actionCreator Метод для формирования данных в экшене
 */
export default function createAction<
    Type extends string,
    ActionCreator extends (...args: any[]) => Record<string, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
>(type: Type, actionCreator: ActionCreator) {
    type Arg = Parameters<ActionCreator>;
    type Ret = ReturnType<ActionCreator>;
    const result = (...args: Arg) => ({
        type,
        ...(actionCreator && (actionCreator(...args) as Ret)),
    });

    (result as unknown as ActionCreator & Typed<Type>).type = type;

    return result as Typed<Type> & typeof result;
}
export const useAppDispatch: () => AppDispatch = useDispatch;