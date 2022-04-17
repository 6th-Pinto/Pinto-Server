import { Inject, Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { commonError } from '../constants/error';
import { comparePassword } from '../utils/hash';
import JwtHelper from '../helpers/jwt';
import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';
import { UserLoginInfo } from '../types';

@Service()
class AuthService {
  private userRepository: UserRepository;

  private jwtHelper: JwtHelper;

  constructor(
    @InjectRepository(UserRepository) userRepository: UserRepository,
    @Inject('jwtHelper') jwtHelper: JwtHelper,
  ) {
    this.userRepository = userRepository;
    this.jwtHelper = jwtHelper;
  }

  async login({ userId, password }: UserLoginInfo): Promise<{ access: string; refresh: string }> {
    const user = await this.userRepository.findByUserId(userId);
    const openName = await this.userRepository.findNameByUserID(userId);
    // const openMajor = await this.userRepository.findMajorByUserID(userId);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const isValid = comparePassword(user.password, password);
    if (!isValid) {
      throw new ErrorResponse(commonError.unauthorized);
    }
    const tokens = this.jwtHelper.generateJwtTokens(user);
    console.log(openName);
    // console.log(openMajor)
    return tokens;
  }

  
  async openInfoName({ userId, password }: UserLoginInfo): Promise<{ userOpenName: any;  }> {
    const openName: any = await this.userRepository.findNameByUserID(userId);
    console.log(openName);
    return openName
  }
  
  
  async openInfoSchool({ userId, password }: UserLoginInfo): Promise<{ userOpenSchool: any;  }> {
    const openschool: any = await this.userRepository.findSchoolByUserID(userId);
    return openschool
  }

  async openInfoMajor({ userId, password }: UserLoginInfo): Promise<{ userOpenMajor: any;  }> {
    const openMajor: any = await this.userRepository.findMajorByUserID(userId);

    return openMajor
  }

  async refreshAccessToken(refreshToken: string): Promise<{ access: string }> {
    if (!refreshToken) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const { uid } = this.jwtHelper.decodeRefreshToken(refreshToken);

    const user = await this.userRepository.findByUid(uid);
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const access = this.jwtHelper.generateAccessToken(user);
    return { access };
  }
}

export default AuthService;
