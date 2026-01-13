#!/usr/bin/env node

// 可交互命令行模块引入
const inquirer = require('inquirer')

// 创建子进程模块引入
const { execSync, spawn } = require('child_process')

const mergeBranch = [
    'master',
    'test',
    'dev',
]

//获取当前分支名
// const currentBranch = execSync('git symbolic-ref --short -q HEAD').toString().trim()


//命令行交互列表
const promptList = [
    {
        choices: mergeBranch,
        default: mergeBranch[0],
        message: '请选择当前需要部署分支，^_^',
        name: 'branchTarget',
        type: 'list'
    },
    {
        default: false,
        message: '是否更新依赖包？\033[34m (默认情况都是No) \033[0m',
        name: 'dependencies',
        type: 'confirm'
    },
    {
        default: true,
        message: function (answers) {
            return '确定把部署\033[32m' + answers.branchTarget + '\033[0m 的分支代码吗?'
        },
        name: 'confirm',
        type: 'confirm'
    }
]

function build(answers) {
    const child = spawn('sh', ['deploy/sub-build.sh'], {
        stdio: 'inherit',
        env: Object.assign({
        DEPLOY_BRANCH: answers.branchTarget,
        INSTALL_DEPENDENCIES: answers.dependencies
        }, process.env)
    })

    child.on('close', (code) => {
       
    })
}

async function main() {
    let answers = await inquirer.prompt(promptList)
    if(answers.confirm) {
        build(answers)
    }
}

main()