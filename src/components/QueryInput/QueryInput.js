import { forwardRef } from 'react';

import { HiOutlineSearch } from 'react-icons/hi';
import debounce from 'lodash/debounce';
import { Input } from 'components/ui';


const QueryInput = forwardRef(({ onInputChange }, ref) => {
    const debounceFn = debounce(handleDebounceFn, 500);

    function handleDebounceFn(val) {
        if (onInputChange) {
            onInputChange(val);
        }
    }

    const onEdit = (e) => {
        debounceFn(e.target.value);
    };

    return (
        <Input
            ref={ref}
            className="lg:w-52 h-10"
            size="sm"
            placeholder="Search"
            prefix={<HiOutlineSearch className="text-lg" />}
            onChange={onEdit}
        />
    );
});

QueryInput.displayName = 'QueryInput';

export default QueryInput;
