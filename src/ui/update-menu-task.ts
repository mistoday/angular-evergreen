import * as packageManager from '../file/package-manager'
import * as vscode from 'vscode'

import { getUpgradeChannel } from '../helpers/upgrade-channel.helpers'
import { PackagesToCheck } from '../common/enums'
import { read } from 'fs'
import { PackageManager } from '../file/package-manager'
import { TreeTask } from '../types/tree-task'

export class UpdateMenuTask implements vscode.TreeDataProvider<TreeTask> {
  constructor(private context: vscode.ExtensionContext) {}

  public async getChildren(task?: TreeTask): Promise<TreeTask[]> {
    let treeTasks: TreeTask[] = [
      new TreeTask(
        'Link',
        'How to Update',
        vscode.TreeItemCollapsibleState.None,
        undefined,
        this.context.extensionPath + '/resources/angular-icon.svg'
      ),
      new TreeTask(
        'Link',
        'Visit blog.angular.io',
        vscode.TreeItemCollapsibleState.None,
        {
          command: 'ng-evergreen.navigateToBlogIo',
          title: 'Visit blog.angular.io',
        },
        this.context.extensionPath + '/resources/angular-icon.svg'
      ),
    ]

    return treeTasks
  }

  getTreeItem(task: TreeTask): vscode.TreeItem {
    return task
  }

  private getVersionTree(currentVersion: packageManager.IVersionStatus) {
    return [
      new TreeTask(
        'Folder',
        'Latest Version: ' + currentVersion.latestVersion,
        vscode.TreeItemCollapsibleState.None
      ),
      new TreeTask(
        'Folder',
        'Next Version: ' + currentVersion.nextVersion,
        vscode.TreeItemCollapsibleState.None
      ),
    ]
  }
}
