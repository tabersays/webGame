angular.module('GameCtrl', []).controller('GameController', ['$scope', 'Character', '$location', function ($scope, Character, $location) {
    $scope.createNewCharacter = false;
    $scope.character = {
        name: '',
        gender: '',
        class: '',
        str: 1,
        dex: 1,
        spd: 1,
        end: 1,
        con: 1,
        mnd: 1,
        sol: 1
    };
    $scope.stats = [
        $scope.character.str, $scope.character.dex, $scope.character.spd,
        $scope.character.end, $scope.character.con, $scope.character.mnd, $scope.character.sol
    ];
    $scope.points = function() {
        return (17 - ($scope.character.str + $scope.character.dex + $scope.character.spd +
            $scope.character.end + $scope.character.con + $scope.character.mnd + $scope.character.sol))
    };

    $scope.validateStr = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.str--;
            }
        }
        if ($scope.character.str < 1) {
            while($scope.character.str < 1) {
                $scope.character.str++;
            }
        }
    };
    $scope.validateDex = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.dex--;
            }
        }
        if ($scope.character.dex < 1) {
            while($scope.character.dex < 1) {
                $scope.character.dex++;
            }
        }
    };
    $scope.validateSpd = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.spd--;
            }
        }
        if ($scope.character.spd < 1) {
            while($scope.character.spd < 1) {
                $scope.character.spd++;
            }
        }
    };
    $scope.validateEnd = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.end--;
            }
        }
        if ($scope.character.end < 1) {
            while($scope.character.end < 1) {
                $scope.character.end++;
            }
        }
    };
    $scope.validateCon = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.con--;
            }
        }
        if ($scope.character.con < 1) {
            while($scope.character.con < 1) {
                $scope.character.con++;
            }
        }
    };
    $scope.validateMnd = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.mnd--;
            }
        }
        if ($scope.character.mnd < 1) {
            while($scope.character.mnd < 1) {
                $scope.character.mnd++;
            }
        }
    };
    $scope.validateSol = function() {
        if ($scope.points() < 0) {
            while($scope.points() < 0) {
                $scope.character.sol--;
            }
        }
        if ($scope.character.sol < 1) {
            while($scope.character.sol < 1) {
                $scope.character.sol++;
            }
        }
    };


    $scope.getCharacters = function () {
        Character.get().then(function (response) {
            $scope.characters = response.data;
        });
    };

    $scope.chooseCharacter = function(character) {
        window.character = character;
        $location.url('/game/play');
    };

    $scope.createCharacter = function() {
        $scope.createNewCharacter = true;
    };

    $scope.create = function() {
        $scope.createNewCharacter = false;
        Character.create($scope.character).then(function () {
            Character.get().then(function (response) {
                $scope.characters = response.data;
            });
        });

    };


    $scope.deleteCharacter = function (characterId){
        Character.delete(characterId).then(function () {
            Character.get().then(function (response) {
                $scope.characters = response.data;
            });
        });
    };
}]);