#### solidity study

#### Storage Example
```
constract SimpleStorage {
    unit storeData;

    function set() public {
        storedData = x;
    }

    function get() public view returns (unit) {

        return storedData;
    }
}
```