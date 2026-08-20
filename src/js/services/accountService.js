import GithubAccount from '../dto/GithubAccount.js';
import { accounts as accountData } from '../data/mockAccounts.js';

// Single place that turns raw data into domain objects — swap for an API call later.
const accounts = accountData.map((data) => new GithubAccount(data));

export function findAccountByIdentifier(identifier) {
  return accounts.find((account) => account.matchesIdentifier(identifier)) ?? null;
}
