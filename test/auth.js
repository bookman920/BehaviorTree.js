/**
 * 单元测试：注册登录
 * Creted by liub 2017.3.24
 */
let BehaviorTree = require('../btree-complete');

class Dog{
    liftALeg(){
        console.log('hello');
    }
}

class InvertDecorator extends BehaviorTree.Decorator
{
    success(){
        this._control.fail();
    }
    fail(){
        this._control.success();    
    }
}

describe('创建', function() {
    it('简单的行为树', done =>{
        let task = new BehaviorTree.Task({
            title: 'mark tree',
            run: function(dog) {
                dog.liftALeg();
                this.fail();
            }
        })

        let seq = new BehaviorTree.Sequence({
            title: 'bark example',
            nodes: [
                task,
                task,
            ]
        });

        let decoratedSequence = new InvertDecorator({
            title: 'decorated sequence',
            node: seq,
        });

        BehaviorTree.register('bark', decoratedSequence);

        var btree = new BehaviorTree({
            title: 'dog behaviors',
            tree: new BehaviorTree.Sequence({
                title: '',
                nodes: [
                    'bark', 
                    'bark'
                ],
            }) 
        });

        var dog = new Dog();
        btree.setObject(dog);

        btree.step();

        done();
    });
});
